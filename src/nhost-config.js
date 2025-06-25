import { NhostClient } from '@nhost/nhost-js';

const nhost = new NhostClient({
  subdomain: 'myproject',
  region: 'eu-central-1'
});

export default nhost;