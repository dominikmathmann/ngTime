/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
    'jquery': 'vendor/jquery/dist/jquery.js',
    'moment': 'vendor/moment',
    'bootstrap': 'vendor/bootstrap/dist/js/bootstrap.js',
    'datatables.net': 'vendor/datatables.net/js/jquery.dataTables.js',
    'metismenu': 'vendor/metismenu/dist/metisMenu.js'
};

/** User packages configuration. */
const packages: any = {
    'jquery': {
        format: 'global'
    },
    'moment': {
        format: 'cjs'
    },
    'bootstrap': {
        format: 'global',
        'deps': [
            'jquery'
        ]
    },
    'metismenu': {
        format: 'global',
        'deps': [
            'jquery'
        ]
    },
    'datatables.net': {
        'format': 'global',
        'deps': [
            'jquery'
        ]
    }

};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',

    // Thirdparty barrels.
    'rxjs',

    // App specific barrels.
    'app',
    'app/shared',
    'app/+home',
    'app/+export',
    'app/+projects',
    'app/+record',
    'app/+report',
    'app/+export/shared/export-link',
    'app/+home/shared/summary-block',
    'app/+projects/shared/project-select',
    /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
