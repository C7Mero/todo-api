import express from 'express';

export const controllErrorResponse = (res: express.Response, error:any) => {
    res.status(500).json({ error: error });
  };