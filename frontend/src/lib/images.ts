export const getRandomImageUrl = (): string => {
  const imageUrls: string[] = [
    "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?_gl=1*1fqad2m*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODI5MTYkajM3JGwwJGgw",
    "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?_gl=1*17dzhea*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODI5MjEkajMyJGwwJGgw",
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?_gl=1*ejo4yg*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODI5MzUkajE4JGwwJGgw",
    "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?_gl=1*dq5c0c*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODI5NDYkajckbDAkaDA.",
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?_gl=1*sy2r8g*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODI4OTMkajYwJGwwJGgw",
    "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?_gl=1*18tplis*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODMwMzMkajQkbDAkaDA.",
    "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?_gl=1*ezlrxe*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODMwMzckajYwJGwwJGgw",
    "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?_gl=1*j0ybo2*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODMwNTUkajQyJGwwJGgw",
    "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?_gl=1*1i3wgqo*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODMwNjckajMwJGwwJGgw",
    "https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?_gl=1*i0p47j*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODMwNzkkajE4JGwwJGgw",
    "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?_gl=1*1b48k8w*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODMwODIkajE1JGwwJGgw",
    "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?_gl=1*1msf45f*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODQwMTkkajMwJGwwJGgw",
    "https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?_gl=1*99eokn*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODQwMjUkajI0JGwwJGgw",
    "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?_gl=1*1rfh1k*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODQwNDckajIkbDAkaDA.",
    "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?_gl=1*1ke71ls*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODQwNTAkajYwJGwwJGgw",
    "https://images.pexels.com/photos/101533/pexels-photo-101533.jpeg?_gl=1*17ev64*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODQwNjgkajQyJGwwJGgw",
    "https://images.pexels.com/photos/916925/pexels-photo-916925.jpeg?_gl=1*1gjkhdr*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODQwNzAkajQwJGwwJGgw",
    "https://images.pexels.com/photos/588776/pexels-photo-588776.jpeg?_gl=1*1u3m9he*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTE4ODIxMDckbzQkZzEkdDE3NTE4ODQwODEkajI5JGwwJGgw",
  ];

  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};
