import {ICar} from './../types/types'
import { stringCompare } from '../utils/stringCompare';

class Element {
    Key: string | null;
    Value: ICar | null;
    OriginalAddress: number;
    isEmpty: boolean;
    isDeleted: boolean;

    constructor() {
        this.Key = null;
        this.Value = null;
        this.OriginalAddress = 0;
        this.isEmpty = true;
        this.isDeleted = false;
    }
}

export class HashCars {
    segments: Element[] = new Array(HashCars.size);
    static size: number = 100;
    maxCollision: number = 5;

    constructor() {
        for (let i = 0; i < HashCars.size; i++) {
            this.segments[i] = new Element();
        }
    }

    ClearHash():void {
        this.segments = new Array(HashCars.size);
        for (let i = 0; i < HashCars.size; i++) {
            this.segments[i] = new Element();
        }
        HashCars.size = 100;
        this.maxCollision = 5;
    }

    HashFun(currentKey:string):number {
        let hashSum = 0;

        for (let i = 0; i < currentKey.length; i++) {
            hashSum += Math.pow(currentKey[i].charCodeAt(0), 2)
        }

        hashSum %= HashCars.size;
        return hashSum;
    }

    SecondHashFun(currentKey:string):number {
        let hashSum = 0;
        let k = 2;

        for (let i = 0; i < currentKey.length; i++) {
            hashSum += Math.pow(currentKey[i].charCodeAt(0) * k, 2);
            k += 1;
        }

        hashSum %= HashCars.size;
        return hashSum;
    }

    RehashFun():void {
        let coeff:number = 2;

        let newSegments:Element[] = new Array(HashCars.size);

        for (let i = 0; i < HashCars.size; i++) {
            newSegments[i] = this.segments[i];
        }

        this.segments = new Array(HashCars.size * coeff);

        for (let j = 0; j < HashCars.size * coeff; j++) {
            this.segments[j] = new Element();
        }

        HashCars.size *= coeff;

        for (const item of newSegments) {
            if (item.Key)
                this.Insert(item.Key, item.Value, true)
        }
    }

    Insert(key:string, value:ICar | null, flag:boolean = false):void {
        let collision:number = 0;
        let originalAddress:number = (this.HashFun(key) + collision * this.SecondHashFun(key)) % HashCars.size;

        while (true) {
            let address:number = (this.HashFun(key) + collision * this.SecondHashFun(key)) % HashCars.size;
            let segment:Element = this.segments[address];

            if (segment.isEmpty || segment.isDeleted) {
                segment.Key = key;
                segment.Value = value;
                segment.OriginalAddress = originalAddress;
                segment.isEmpty = false;
                segment.isDeleted = false;
                return;
            }

            if (collision > this.maxCollision && flag) {
                collision = 0;
                this.RehashFun()
                continue;
            }

            collision += 1;
        }
    }

    Remove(key:string):number {
        let collision:number = 0;

        while (true) {
            let address:number = (this.HashFun(key) + collision * this.SecondHashFun(key)) % HashCars.size;

            let segment:Element = this.segments[address];

            if (segment.Key === key) {
                segment.Key = null;
                segment.Value = null;
                segment.isDeleted = true;
                return segment.OriginalAddress;
            }

            if (segment.isEmpty)
                return -1;
            
            collision +=1;
        }
    }

    Find(key:string):ICar | null {
        let collision:number = 0;

        while (true) {
            let address:number = (this.HashFun(key) + collision * this.SecondHashFun(key)) % HashCars.size;
            let segment:Element = this.segments[address];

            if (segment.Key === key)
                return segment.Value;
            if (segment.isEmpty || collision > this.maxCollision)
                return null;
            collision +=1;
        }
    }

    FindSegment(key:string):Element | null {
        let collision:number = 0;

        while (true) {
            let address:number = (this.HashFun(key) + collision * this.SecondHashFun(key)) % HashCars.size;
            let segment:Element = this.segments[address];

            if (segment.Key === key)
                return segment;
            if (segment.isEmpty || collision > this.maxCollision)
                return null;
            collision +=1;
        }
    }

    FindList(key:string):Array<ICar | null> {

        let arr:Array<ICar | null> = [];
        
        for (let i = 0; i < HashCars.size; i++) {
            const text = this.segments[i].Value?.brand;
            if (text)
                if (stringCompare(text, key))
                    arr.push(this.segments[i].Value)
        }

        return arr;
    }

    GetArray():Array<ICar | null> {
        let arr: Array<ICar | null> = [];
        for (let i = 0; i < HashCars.size; i++) {
            if (this.segments[i].Key)
                arr.push(this.segments[i].Value);
        }
        return arr;
    }

    ShowTable():void {
        for (let i = 0; i < HashCars.size; i++) {
            console.log(this.segments[i].Key, this.segments[i].Value)
        }
    }
}