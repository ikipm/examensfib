import {Router} from 'express';
import Subject from '../models/Subject.js';

const router = Router();

router.get('/test', (req, res) => {
    res.json({missatge: 'Response from API'});
});

router.get('/subjects', async (req, res) => {
    const subjects = await Subject.find();
    res.json(subjects);
});

export default router;