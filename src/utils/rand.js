import {faker} from "@faker-js/faker";

export function randIntGenerator(min, max) {
    return () => Math.floor(Math.random() * (max - min) + min);
}

export function randIntArray(len, min, max) {
    return Array.from({length: len}, () => faker.datatype.number({min, max}));
}
