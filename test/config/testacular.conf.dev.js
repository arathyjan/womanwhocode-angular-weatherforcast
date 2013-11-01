basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
    '../app/components/angular/angular.js',
    '../app/components/angular-mocks/angular-mocks.js',
    '../app/components/ngInfiniteScroll/ng-infinite-scroll.js',
    '../app/**/constants.js',
    '../app/**/modules/**/init.js',
    '../app/**/modules/**/*.js',
    'unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

reporters = ['dots', 'junit'];

junitReporter = {
  outputFile: 'output/unit.xml',
  suite: 'unit'
};
