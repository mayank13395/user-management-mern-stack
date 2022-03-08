import server from './src';
import logger from './src/logger';
const port = process.env.PORT || 8081;
server.listen(port, () => {
    logger.info(`server started on port ${port}`);
});
