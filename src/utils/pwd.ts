import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac('sha512', 'kdhh7JahduaogdUyhauiaoys79090-3q0r93jdjaknmlsl-l=./.xkgvjhsvdaghpuahda[iondkln');
  hmac.update(p);
  return hmac.digest('hex');
};
