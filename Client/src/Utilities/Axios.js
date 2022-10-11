import Axios from 'axios';
import AxiosRetry from 'axios-retry';

const AxiosInstance = Axios.create();

AxiosRetry(AxiosInstance, {
    retries: 2,
    retryDelay: (RetryNumber) => ( (Math.pow(0, RetryNumber) * 1000) + 1000 * Math.random() ),
    retryCondition: () => AxiosRetry.isRetryableError
});

export default AxiosInstance;