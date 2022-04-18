/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    // {
    //     id      : 'money-and-banking',
    //     title   : 'Money and Banking',
    //     type    : 'collapsable',
    //     children: [
    //         {
    //             id   : 'money-and-bankings.forex-reserves',
    //             title: 'Forex Reserves',
    //             type : 'basic',
    //             icon : 'heroicons_outline:clipboard-check',
    //             link : '/dashboards/forex-reserves'
    //         },
    //         {
    //             id   : 'money-and-bankings.currency-with-public',
    //             title: 'Currency with Public',
    //             type : 'basic',
    //             icon : 'heroicons_outline:currency-dollar',
    //             link : '/dashboards/currency-with-public'
    //         },
    //         {
    //             id   : 'money-and-bankings.m3',
    //             title: 'M3',
    //             type : 'basic',
    //             icon : 'heroicons_outline:cash',
    //             link : '/dashboards/m3'
    //         }
    //     ]
    // },
    // {
    //     id      : 'external-selector',
    //     title   : 'External Sector',
    //     type    : 'collapsable',
    //     children: [
    //         {
    //             id   : 'external-selector.india-exports',
    //             title: 'India Exports',
    //             type : 'basic',
    //             icon : 'heroicons_outline:trending-up',
    //             link : '/dashboards/india-exports'
    //         },
    //         {
    //             id   : 'external-selector.india-imports',
    //             title: 'India Imports',
    //             type : 'basic',
    //             icon : 'heroicons_outline:trending-down',
    //             link : '/dashboards/india-imports'
    //         },
    //     ]
    // },
    // {
    //     id      : 'energy',
    //     title   : 'Energy',
    //     type    : 'collapsable',
    //     children: [
    //         {
    //             id   : 'energy.fuel-consumption',
    //             title: 'Fuel Consumption (with bifurcations)',
    //             type : 'basic',
    //             icon : 'heroicons_outline:truck',
    //             link : '/dashboards/fuel-consumption'
    //         },
    //     ]
    // },
    // {
    //     id      : 'pricing',
    //     title   : 'Pricing',
    //     type    : 'collapsable',
    //     children: [
    //         {
    //             id   : 'pricing.cpi-information',
    //             title: 'CPI Inflation',
    //             type : 'basic',
    //             icon : 'heroicons_outline:presentation-chart-line',
    //             link : '/dashboards/cpi'
    //         },
    //     ]
    // },
    // {
    //     id      : 'employment',
    //     title   : 'Employment',
    //     type    : 'collapsable',
    //     children: [
    //         {
    //             id   : 'employment.unemployment-rate',
    //             title: 'Unemployment Rate',
    //             type : 'basic',
    //             icon : 'heroicons_outline:academic-cap',
    //             link : '/dashboards/unemployment-rate'
    //         },
    //     ]
    // },
    // {
    //     id      : 'india-industrial-production',
    //     title   : 'India Industrial Production',
    //     type    : 'collapsable',
    //     children: [
    //         {
    //             id   : 'india-industrial-production.monthly',
    //             title: 'Monthly',
    //             type : 'basic',
    //             icon : 'heroicons_outline:calendar',
    //             link : '/dashboards/iip'
    //         },
    //     ]
    // },
    // {
    //     id      : 'miscellaneous',
    //     title   : 'Miscellaneous',
    //     type    : 'collapsable',
    //     children: [
    //         {
    //             id   : 'miscellaneous-selector.workspace-mobility',
    //             title: 'Workplace Mobility',
    //             type : 'basic',
    //             icon : 'heroicons_outline:briefcase',
    //             link : '/dashboards/workplace-mobility'
    //         },
    //         {
    //             id   : 'miscellaneous-selector.covid-stringency-index',
    //             title: 'COVID Stringency Index',
    //             type : 'basic',
    //             icon : 'heroicons_outline:trending-up',
    //             link : '/dashboards/covid-stringency-index'
    //         },
    //     ]
    // },
    {
        id      : 'real-economy',
        title   : 'Real Economy',
        type    : 'collapsable',
        children: [
            {
                id   : 'real-economy.index-of-industrial-production',
                title: 'Index of Industrial Production (IIP) - Use based',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/iip'
            },
            {
                id   : 'real-economy.electrical-energy-demand-met',
                title: 'Electrical Energy Demand Met',
                type : 'basic',
                icon : 'heroicons_outline:currency-dollar',
                link : '/dashboards/electrical-energy'
            },
            {
                id   : 'real-economy.consumption-petroleum-products',
                title: 'Consumption of Petroleum Products',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/fuel-consumption'
            }
        ]
    },
    {
        id      : 'external-sector',
        title   : 'External Sector',
        type    : 'collapsable',
        children: [
            {
                id   : 'external-sector.exports',
                title: 'Exports',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/india-exports'
            },
            {
                id   : 'external-sector.imports',
                title: 'Imports',
                type : 'basic',
                icon : 'heroicons_outline:currency-dollar',
                link : '/dashboards/india-imports'
            },
            {
                id   : 'external-sector.foreign-exchange-reserves',
                title: 'Foreign Exchange Reserves',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/forex-reserves'
            },
            {
                id   : 'external-sector.exchange-rate',
                title: 'Exchange Rate',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/exchange-rate'
            }
        ]
    },
    {
        id      : 'labour-market',
        title   : 'Labour Market',
        type    : 'collapsable',
        children: [
            {
                id   : 'labour-market.unemployment-rate',
                title: 'Unemployment Rate',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/unemployment-rate'
            }
        ]
    },
    {
        id      : 'banking-and-finance',
        title   : 'Banking And Finance',
        type    : 'collapsable',
        children: [
            {
                id   : 'banking-and-finance.rbi-transaction-amount',
                title: 'RBI Transaction Amount',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/rbi-amount'
            },
            {
                id   : 'banking-and-finance.rbi-transaction-volume',
                title: 'RBI Transaction Volume',
                type : 'basic',
                icon : 'heroicons_outline:currency-dollar',
                link : '/dashboards/rbi-volume'
            },
            {
                id   : 'banking-and-finance.rbi-consumer-confidence',
                title: 'RBI Consumer Confidence Survey',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/rbi-consumer'
            },
            {
                id   : 'banking-and-finance.aggregate-deposits',
                title: 'Aggregate Deposits in Scheduled Commercial Banks',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/agg-scb'
            }
        ]
    },
    {
        id      : 'money-and-inflation',
        title   : 'Money and Inflation',
        type    : 'collapsable',
        children: [
            {
                id   : 'money-and-inflation.m3',
                title: 'M3',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/m3'
            },
            {
                id   : 'money-and-inflation.currency-with-public',
                title: 'Currency with the public',
                type : 'basic',
                icon : 'heroicons_outline:currency-dollar',
                link : '/dashboards/currency-with-public'
            },
            {
                id   : 'money-and-inflation.cpi-inflation-index',
                title: 'CPI Inflation Index',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/cpi'
            }
        ]
    },
    {
        id      : 'mobility',
        title   : 'Mobility',
        type    : 'collapsable',
        children: [
            {
                id   : 'mobility.retail',
                title: 'Retail Mobility',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/retail-mobility'
            },
            {
                id   : 'mobility.grocery-and-pharmacy',
                title: 'Grocery & Pharmacy Mobility',
                type : 'basic',
                icon : 'heroicons_outline:currency-dollar',
                link : '/dashboards/grocery-pharmacy-mobility'
            },
            {
                id   : 'mobility.public-transport',
                title: 'Public Transport Mobility',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/public-transport-mobility'
            },
            {
                id   : 'mobility.workplace',
                title: 'Workplace Mobility',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/workplace-mobility'
            },
            {
                id   : 'mobility.residential',
                title: 'Residential Mobility',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/residential-mobility'
            },
            {
                id   : 'mobility.parks',
                title: 'Parks Mobility',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/parks-mobility'
            },
            {
                id   : 'mobility.driving',
                title: 'Driving Mobility',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/driving-mobility'
            },
            {
                id   : 'mobility.walking',
                title: 'Walking Mobility',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/walking-mobility'
            }
        ]
    },
    {
        id      : 'covid',
        title   : 'Covid',
        type    : 'collapsable',
        children: [
            {
                id   : 'covid.confirmed-cases',
                title: 'Covid Confirmed Cases',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/covid-confirmed-cases'
            },
            {
                id   : 'covid.deceased',
                title: 'Deceased',
                type : 'basic',
                icon : 'heroicons_outline:currency-dollar',
                link : '/dashboards/covid-deceased'
            },
            {
                id   : 'covid.recovered-cases',
                title: 'Recovered Cases',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/covid-recovered'
            },
            {
                id   : 'covid.covid-tests',
                title: 'Covid Tests',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/covid-tests'
            },
            {
                id   : 'covid.test-positivity-ratio',
                title: 'Test Positivity Ratio',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/covid-positivity-ratio'
            },
            {
                id   : 'covid.vaccine-first-dose',
                title: 'Covid Vaccine (First Dose)',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/covid-vaccine-first'
            },
            {
                id   : 'covid.vaccine-second-dose',
                title: 'Covid Vaccine (Second Dose)',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/covid-vaccine-second'
            }, 
            {
                id   : 'covid.vaccine-third-dose',
                title: 'Covid Vaccine (Third Dose)',
                type : 'basic',
                icon : 'heroicons_outline:cash',
                link : '/dashboards/covid-vaccine-third'
            }
        ]
    },
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
