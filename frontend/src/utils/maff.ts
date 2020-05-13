export const bez = (t: number): { u: number; v: number } => {
  // do magic

  const u = t
  const v = t

  return {
    u,
    v,
  }
}

let total = 0
for (let i = 1; i < 3; i++) {
  total += i * i + 2
}
console.log(total)
