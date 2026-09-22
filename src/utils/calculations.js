// Pricing calculation utilities

export const calculateEstimate = (quote, config) => {
  if (!quote.product) return null;

  // Base product price
  let basePrice = 0;

  if (quote.productCategory === "blinds") {
    const sizeCategory = config.getSizeCategory(quote.width, quote.height);
    const product = config.products.blinds.find((p) => p.id === quote.product);
    if (product) {
      basePrice = product.pricing[sizeCategory];
    }
  } else if (quote.productCategory === "curtains") {
    const product = config.products.curtains.find((p) => p.id === quote.product);
    if (product) {
      basePrice = product.startingPrice;
    }
  }

  // Apply quantity
  let productSubtotal = basePrice * quote.quantity;

  // Add blind options
  if (quote.productCategory === "blinds") {
    if (quote.operation && quote.operation !== "standard") {
      const op = config.blindOptions.operation.options.find(
        (o) => o.id === quote.operation
      );
      if (op) productSubtotal += op.price * quote.quantity;
    }

    if (quote.lightControl === "blackout") {
      const lc = config.blindOptions.lightControl.options.find(
        (o) => o.id === "blackout"
      );
      if (lc) productSubtotal += lc.price * quote.quantity;
    }

    // Add upgrades
    if (quote.upgrades && quote.upgrades.length > 0) {
      quote.upgrades.forEach((upgradeId) => {
        const upgrade = config.blindOptions.upgrades.find(
          (u) => u.id === upgradeId
        );
        if (upgrade) productSubtotal += upgrade.price * quote.quantity;
      });
    }
  } else if (quote.productCategory === "curtains") {
    // Add curtain upgrades
    if (quote.upgrades && quote.upgrades.length > 0) {
      quote.upgrades.forEach((upgradeId) => {
        const upgrade = config.curtainOptions.upgrades.find(
          (u) => u.id === upgradeId
        );
        if (upgrade) productSubtotal += upgrade.price * quote.quantity;
      });
    }
  }

  // Apply discount
  const discountAmount = productSubtotal * config.business.promotionDiscount;
  const discountedSubtotal = productSubtotal - discountAmount;

  // Calculate installation
  let installationCost = 0;
  if (quote.installation === "professional") {
    const professional = config.installation.professionalInstallation;
    installationCost =
      professional.firstWindow +
      professional.additionalWindow * (quote.quantity - 1);
  }

  // Subtotal before tax
  const subtotalBeforeTax = discountedSubtotal + installationCost;

  // Calculate GST
  const gst = subtotalBeforeTax * config.business.taxRate;

  // Final total
  const total = subtotalBeforeTax + gst;

  return {
    basePrice,
    sizeCategory: config.getSizeCategory(quote.width, quote.height),
    productSubtotal,
    discountAmount,
    discountedSubtotal,
    installationCost,
    subtotalBeforeTax,
    gst,
    total,
  };
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const getProductName = (productId, productCategory, config) => {
  if (productCategory === "blinds") {
    return config.products.blinds.find((p) => p.id === productId)?.name || "";
  } else if (productCategory === "curtains") {
    return config.products.curtains.find((p) => p.id === productId)?.name || "";
  }
  return "";
};
