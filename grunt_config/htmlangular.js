module.exports = {
  options: {
    concurrentJobs: 2,
    reportCheckstylePath: null,
    reportpath: null,
    tmplext: 'html.tmpl',
    w3clocal: 'http://w3c-validator.local/nu',
    customtags: ['navbar'],
    customattrs: ['dynamic-model']
  },
  files: {
    src: ['src/public/app/**/*.html', 'src/public/app/**/*.html.tmpl']
  }
};
