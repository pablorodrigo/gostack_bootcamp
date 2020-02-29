/**
 * This way it will run separate our main app. Which means, it will not impact on performance.
 */

// added here because it run separated
import 'dotenv/config';

import Queue from './app/lib/Queue';

Queue.processQueue();
