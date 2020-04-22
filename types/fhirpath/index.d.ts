declare module 'fhirpath' {
    export function evaluate(
        resource: any,
        path: string,
        context: any,
        model: any
    ): (resource: any) => any;
}

declare module 'fhirpath/fhir-context/r4'

declare module 'fhirpath/fhir-context/stu3'