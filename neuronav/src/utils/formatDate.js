export function formatShort(dateString) {
  const d = new Date(dateString)
  return d.toLocaleDateString()
}
