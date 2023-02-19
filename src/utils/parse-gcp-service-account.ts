type GoogleCloudServiceAccountKey = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
};

export function parseGoogleCloudServiceAccountKey(serviceAccountKeyBase64: string): GoogleCloudServiceAccountKey {
  const serviceAccountBuffer = Buffer.from(serviceAccountKeyBase64, 'base64');
  const serviceAccount = JSON.parse(serviceAccountBuffer.toString('utf8'));
  return serviceAccount;
}
