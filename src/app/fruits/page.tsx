export default function FruitsPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Our Fresh Fruits Selection 🍏</h2>
      <p>Explore our organic, farm-fresh collection.</p>

      {/* Grid wrapper for your upcoming design */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
        {/* Fruit items will be mapped here */}
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
          <h3>Fresh Strawberries</h3>
          <p>Sweet and juicy organic strawberries.</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
          <h3>Green Apples</h3>
          <p>Crisp and tart apples perfect for snacks.</p>
        </div>
      </div>
    </div>
  );
}