export interface Import {
    imports(...items: string[]): Import;
    importModule(): Import;
    importModuleAs(alias: string): Import;
    if(condition: boolean): Import;
    else(): Import;
    endif(): Import;
}
