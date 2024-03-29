import ComputerModel, { ComputerDocument } from '../models/computer.model';
import { nanoid } from 'nanoid';
import { FilterQuery, UpdateQuery } from 'mongoose';
import log from '../utils/logger';

export async function createComputer(OrgUnit: string) {
	try {
		const OneTimeKey = nanoid(64); //generate unique one time key
		log.warn(` ⚠ : Generated new OneTimeKey: ${OneTimeKey}`);

		return await ComputerModel.create({ OrgUnit, OneTimeKey });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		throw new Error(e);
	}
}

export async function updateComputer(
	query: FilterQuery<ComputerDocument>,
	update: UpdateQuery<ComputerDocument>
) {
	//log.info(` ⚠ : Updated UUID: ${update.UUID}`);
	return ComputerModel.updateOne(query, update);
}

export async function findUUID(query: FilterQuery<ComputerDocument>) {
	return ComputerModel.findOne(query).lean();
}

export async function listComputers() {
	return ComputerModel.find();
}

export async function updateLastUpdate(query: FilterQuery<ComputerDocument>) {
	return updateComputer(query, { updatedAt: Date.now() });
}
