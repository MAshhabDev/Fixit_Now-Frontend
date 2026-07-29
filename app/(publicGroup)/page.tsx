const HomePage = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Professional Home Services
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Expert solutions for all your home service needs
          </p>
          <button className="mt-8 rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Cleaning",
                description: "Professional cleaning services for your home",
              },
              {
                title: "Maintenance",
                description:
                  "Regular maintenance to keep your home in top shape",
              },
              {
                title: "Repairs",
                description: "Quick and reliable repair services",
              },
              { title: "Plumbing", description: "Expert plumbing solutions" },
              {
                title: "Electrical",
                description: "Professional electrical services",
              },
              {
                title: "HVAC",
                description: "Heating and cooling system maintenance",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-border bg-background p-6 transition-colors hover:bg-accent"
              >
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Why Choose Us</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              { number: "500+", label: "Happy Customers" },
              { number: "15+", label: "Years Experience" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-primary">
                  {stat.number}
                </div>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-card py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-muted-foreground">
            Contact us today for a free consultation
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Schedule Now
            </button>
            <a
              href="tel:+1234567890"
              className="rounded-lg border border-primary px-8 py-3 font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
