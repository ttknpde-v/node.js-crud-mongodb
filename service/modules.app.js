import express from "express";
import path from 'path'
import process from 'process'
import mongoose from "mongoose";
import bodyParser from "body-parser";

export const modulesApp = {
    express : express ,
    app : express() ,
    path : path ,
    process : process ,
    mongoose : mongoose ,
    bodyParser : bodyParser
}