import Bee from 'bee-queue';
import CancellationMail from '../jobs/CancellationMail';
import redisConfig from '../../config/redis';

// each job needs an unique key
const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        // it is a instance witch communicate the redis and save the data in DB
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        // process each queue (line), receive the variables by our context
        handle,
      };
    });
  }

  /**
   * add new jobs in the queue separately for each email
   * @param queue
   * @param job -> our data
   * @returns {*}
   */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /**
   * get each queue and process in background
   */
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, error) {
    console.log(`Quee ${job.queue.name}: FAILED`, error);
  }
}

export default new Queue();
