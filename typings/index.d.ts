/*
    reaver.db Definitions
*/

interface Options {
    target?: string | null;
    table?: string
}

type DataValue = string | object | number | null | boolean | bigint | symbol | any[];

declare module 'reaver.db' {
    class Database {
        /**
         * The main consturctor (new Database()) that contains all the functions
         */
        public constructor(path?: string);
    
        /**
         * The fetch function that fetches a key from the database
         * @param key 
         * @param ops 
         */
        public fetch(key:string,ops?:Options): any;
    
        /**
         * The get function that gets a key from the database
         * @param key 
         * @param ops 
         */
        public get(key:string,ops?:Options): any;
    
        /**
         * The set function that sets a value of a key from the database
         * @param key 
         * @param value 
         * @param ops 
         */
        public set(key:string,value:DataValue,ops?:Options): any;
    
        /**
         * The add function that adds a number of a key from the database
         * @param key 
         * @param value 
         * @param ops 
         */
        public add(key:string,value:DataValue,ops?:Options): any;
    
        /**
         * The subtract function that subtracts a number of a key from the database
         * @param key 
         * @param value 
         * @param ops 
         */
        public subtract(key:string,value:DataValue,ops?:Options): any;
    
        /**
         * The push function that pushes an element of a key from the database
         * @param key 
         * @param value 
         * @param ops 
         */
        public push(key:string,value:DataValue,ops?:Options): any[];
    
        /**
         * The has function that checked if a key is in the database
         * @param key 
         * @param ops 
         */
        public has(key:string,ops?:Options): boolean;
    
        /**
         * The all function that returns all the data from the database
         * @param ops 
         */
        public all(ops?:Options): { ID: string, data: any }[];
    
        /**
         * The getAll function that gets all the data from the database (Pretty much the same as the all function)
         * @param ops 
         */
        public getAll(ops?:Options): { ID: string, data: any }[];
    
        /**
         * The fetchAll function that fetched all the data from the database (Pretty much the same as the all function and the getAll)
         * @param ops 
         */
        public fetchAll(ops?:Options): { ID: string, data: any }[];
    
        /**
         * The delete all function that deletes all the data from the database (Not recommended!)
         * @param ops 
         */
        public deleteAll(ops?:Options): boolean;
    
        /**
         * The delete function that deletes a key from the database
         * @param key 
         * @param ops 
         */
        public delete(key:string,ops?:Options): boolean;
    
        /**
         * The type function that returns the type of a key from the database (Like boolean or string or number)
         * @param key 
         * @param ops 
         */
        public type(key:string,ops?:Options): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    
        /**
         * The create table function that created new tables on the database
         * @param ops 
         */
        public createTable(ops?:Options): any;
    
        /**
         * The delete table function that deletes tables from the database
         * @param ops 
         */
        public deleteTable(ops?:Options): any;
    }
    export = Database;
}