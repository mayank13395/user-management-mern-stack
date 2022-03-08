/**
 * @author Mayank Kumar
 * @description Server and REST API config
 */
import cors from 'cors';
import 'dotenv/config'
import express from 'express';
import connectDB from './config/database';
import logger from './logger';
import { userRouters } from './routes';
const app = express();
connectDB()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	try {
		const xForwardedFor = ((req.headers['x-forwarded-for'] || '') as string).replace(/:\d+$/, '');
		const ip = xForwardedFor || req.connection.remoteAddress;
		logger.info(
			`IMP - API called path: ${req.path} method: ${req.method}, query: ${JSON.stringify(
				req.query,
			)}, remote address (main/proxy ip):${ip}, reference: ${req.headers.referer} and user-agent: ${req.headers['user-agent']
			}`,
		);
	} catch (error) {
		logger.error(`error while printing caller info path: ${req.path}`);
	}
	next();
});

app.use('/user', userRouters)


export default app;
