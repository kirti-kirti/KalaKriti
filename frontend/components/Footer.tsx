export function Footer() {
  return (
    <footer className="bg-surface-container-low py-24">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold tracking-tighter mb-4">
            STUDIO<span className="text-muted-foreground font-light">AESTHETA</span>
          </h3>
          <p className="text-muted-foreground text-sm">
            Premium custom clothing, tailored to your aesthetic. Handmade with care.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-4">Shop</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>T-Shirts</li>
            <li>Kurtis</li>
            <li>Jeans</li>
            <li>Custom Orders</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Help</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>FAQ</li>
            <li>Shipping & Returns</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Newsletter</h4>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 border-b border-outline bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-primary rounded-none transition-colors"
            />
            <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 rounded-xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-24 pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Studio Aestheta. All rights reserved.
      </div>
    </footer>
  );
}
