import { Prisma, Location } from '@prisma/client'
import { prisma } from 'database/prisma.server'

export const ROOT_LOCATION_ID = 0

type LocationHashMap = Record<number, Location>
// type LocationChildIdHashMap = Record<number, number[]>

// export class LocationTreeNode {
//   constructor(
// 		public value: Location,
// 		public childIds?: number[],
// 	) {
//     this.value = value;
//   }

//   toString() {
//     return this.value.name;
//   }
// }

// export class LocationsTreeBuilder {
// 	constructor(public locationsTreeData: LocationsTreeData) {}

// 	getLocationTreeNode (id: number): LocationTreeNode {
// 		const location = this.locationsTreeData.locationHashMap[id]
	
// 		if (!location) {
// 			throw Error('Location not found')
// 		}
	
// 		const childIds = this.locationsTreeData.parentToChildIdsHashMap[id] ?? []
// 		return new LocationTreeNode(location, childIds)
// 	}

// 	getLocationTreeNodes (ids: number[]): LocationTreeNode[] {
// 		return ids.map(id => this.getLocationTreeNode(id))
// 	}
// }

let locationTreeData: LocationsTreeData;

export type LocationsTreeData = {
	locationHashMap: LocationHashMap,
	// parentToChildIdsHashMap: LocationChildIdHashMap, 
	locationTree: any[]
}

export const getLocationTreeData = async (locationParentId?: number): Promise<LocationsTreeData> => {
	if (!locationTreeData) {
		const locations = await getAllLocations();
		const locationHashMap = transformLocationListToHashMap(locations)
		// const parentToChildIdsHashMap = transformLocationListToParentIdChildIdsHashMap(locations)

		const locationTree = await getLocationTree(locationParentId)

		locationTreeData = {
			locationHashMap, 
			// parentToChildIdsHashMap,
			locationTree
		}
	}

	return locationTreeData
}

const transformLocationListToHashMap = (baseLocationsList: Location[]): LocationHashMap => {
	const locationHashMap: Record<number, Location> = {};
	for (const location of baseLocationsList) {
		locationHashMap[location.id] = location
	}
	return locationHashMap
}

// const transformLocationListToParentIdChildIdsHashMap = (baseLocationsList: Location[]) => {
// 	const parentIdChildIdsLocationHashMap: Record<number, number[]> = {};
// 	for (const location of baseLocationsList) {
// 		if (typeof location.parentId === 'number') {
// 			const parentChildIds = parentIdChildIdsLocationHashMap[location.parentId] ?? []
// 			parentIdChildIdsLocationHashMap[location.parentId] = parentChildIds.concat(location.id)
// 		}
// 	}
// 	return parentIdChildIdsLocationHashMap
// }

//------------------------------

export type LocationLeaf = {
	value: number,
	name: string,
	children: LocationLeaf[]
}

const ROOT_LOCATION_PARENT_ID = null

export const getLocationTree = async (parentId?: number): Promise<LocationLeaf[]> => {
	const locationLevel = await getLocationLevelList(parentId ?? ROOT_LOCATION_PARENT_ID);
	return Promise.all(locationLevel.map(async (locationData) => ({
		value: locationData.id,
		name: locationData.name,
		children: await getLocationTree(locationData.id)
	})))
}

export const getLocationLevelList = async (parentId: number | null): Promise<Location[]> => {
	return prisma.location.findMany({
		where: {
			parentId
		}
	})
}

//--------------------------------------


// export const getLocationsListRaw = async () => {
// 	const locationsList = await getAllLocations()
// 	return locationsList.map(location => ({
// 		id: location.id + 1,
// 		parentId: (location.parentId ?? -1) + 1,
// 		label: location.name,
// 		value: location.id + 1
// 	}))
// }

//--------------------------------------

export const getAllLocations = () => {
	return prisma.location.findMany();
}

export async function createLocation(location: Prisma.LocationCreateInput)
{
	//добавить создание связей
	return prisma.location.create({
		data: location
	})
}

export async function deleteTradeAd(id: number) {
	return prisma.location.delete({
		where: {
			id
		}
	})
}