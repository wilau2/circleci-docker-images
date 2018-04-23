import { promisify } from 'util';
import fs from 'fs';

export const readDir = promisify(fs.readdir);
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const mkdir = promisify(fs.mkdir);
export const exists = promisify(fs.exists);
