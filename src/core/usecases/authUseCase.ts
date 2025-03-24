const OBFUSCATED_CREDENTIALS = [
  { username: "YWRtaW4=", password: "cGFzc3dvcmQxMjM=" }, // admin:password123
  { username: "dXNlcjE=", password: "c2VjcmV0NDU2" },     // user1:secret456
];

export const validateCredentials = (username: string, password: string): boolean => {
  return OBFUSCATED_CREDENTIALS.some((cred) => {
    const decodedUsername = atob(cred.username);
    const decodedPassword = atob(cred.password);
    return decodedUsername === username && decodedPassword === password;
  });
};