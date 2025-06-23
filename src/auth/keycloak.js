import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'https://reslobase-auth.159.69.188.164.nip.io',
  realm: 'reslobase-realm',
  clientId: 'reslobase-client'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
