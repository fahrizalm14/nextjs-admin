export function validatePassword(password: string): string | null {
  // Minimal 8 karakter
  if (password.length < 8) {
    return "Password harus memiliki minimal 8 karakter.";
  }

  // Setidaknya satu huruf besar
  if (!/[A-Z]/.test(password)) {
    return "Password harus memiliki setidaknya satu huruf kapital (A-Z).";
  }

  // Setidaknya satu huruf kecil
  if (!/[a-z]/.test(password)) {
    return "Password harus memiliki setidaknya satu huruf kecil (a-z).";
  }

  // Setidaknya satu angka
  if (!/[0-9]/.test(password)) {
    return "Password harus memiliki setidaknya satu angka (0-9).";
  }

  // Setidaknya satu karakter khusus (simbol)
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return "Password harus memiliki setidaknya satu karakter khusus, seperti !@#$.";
  }

  // Jika semua kriteria terpenuhi, kembalikan null
  return null;
}

export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
