module.exports = {
  fonts: {
    files: [{
      expand: true,
      src: ['node_modules/font-awesome/fonts/*'],
      dest: 'build/public/assets/fonts',
      flatten: true
    }]
  },
  images: {
    files: [{
      expand: true,
      src: [],
      dest: 'build/public/assets/images',
      flatten: true
    }]
  },
  states: {
    files: [{
      expand: true,
      src: ['src/public/app/futureStates.json'],
      dest: 'build/public/app/',
      flatten: true
    }]
  }
};
