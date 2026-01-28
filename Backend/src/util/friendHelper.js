export const swapFriend = (a, b) => {
  const A = a.toString();
  const B = b.toString();
  return A < B ? [A, B] : [B, A];
};