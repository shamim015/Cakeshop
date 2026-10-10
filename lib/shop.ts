/**
 * Shop settings used by Checkout, WhatsApp order and Invoice.
 * >>> CHANGE THESE to your real details <<<
 */
export const SHOP = {
  name: "CakeShop",
  // WhatsApp number that receives the orders: country code + number, digits only (no + or spaces).
  // Example for Bangladesh: 8801712345678
  whatsapp: "8801521233469",
  whatsappDisplay: "+880 1700 000000",
  email: "info@cakeshop.com",
  deliveryFee: 120, // Tk, charged when subtotal is below the free-delivery amount
  freeDeliveryAbove: 3000, // Tk
};
