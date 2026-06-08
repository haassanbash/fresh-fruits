import fs from "fs";
import path from "path";
import crypto from "crypto";

const AUTH_PATH = path.join(process.cwd(), "data", "admin.json");

interface AdminCredentials {
  email: string;
  passwordHash: string;
  salt: string;
}

function readAuth(): AdminCredentials {
  if (!fs.existsSync(AUTH_PATH)) {
    const defaultAuth: AdminCredentials = {
      email: "admin@juicyfresh.com",
      salt: crypto.randomBytes(16).toString("hex"),
      passwordHash: "",
    };
    // Hash default password "admin123"
    defaultAuth.passwordHash = crypto
      .createHash("sha256")
      .update("admin123" + defaultAuth.salt)
      .digest("hex");
    writeAuth(defaultAuth);
    return defaultAuth;
  }
  return JSON.parse(fs.readFileSync(AUTH_PATH, "utf-8"));
}

function writeAuth(auth: AdminCredentials) {
  const dir = path.dirname(AUTH_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(AUTH_PATH, JSON.stringify(auth, null, 2), "utf-8");
}

function hashPassword(password: string, salt: string): string {
  return crypto.createHash("sha256").update(password + salt).digest("hex");
}

// ---- Public functions ----

export async function login(email: string, password: string): Promise<{ success: boolean; token?: string }> {
  const auth = readAuth();
  const hash = hashPassword(password, auth.salt);
  if (email === auth.email && hash === auth.passwordHash) {
    // Generate a simple session token
    const token = crypto.randomBytes(32).toString("hex");
    return { success: true, token };
  }
  return { success: false };
}

export async function getCredentials(): Promise<{ email: string }> {
  const auth = readAuth();
  return { email: auth.email };
}

export async function updateCredentials(
  newEmail?: string,
  newPassword?: string
): Promise<{ success: boolean }> {
  const auth = readAuth();

  if (newEmail) {
    auth.email = newEmail;
  }

  if (newPassword) {
    auth.salt = crypto.randomBytes(16).toString("hex");
    auth.passwordHash = hashPassword(newPassword, auth.salt);
  }

  writeAuth(auth);
  return { success: true };
}

// Validate token (simple check - token stored in memory for session)
const activeTokens = new Set<string>();

export function createSession(token: string) {
  activeTokens.add(token);
}

export function validateSession(token: string): boolean {
  return activeTokens.has(token);
}

export function destroySession(token: string) {
  activeTokens.delete(token);
}
