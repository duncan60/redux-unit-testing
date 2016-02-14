var hostname = 'localhost';
var port = 3001;
module.exports = {
    entry: 'mocha!./test/index.js',
    output: {
        filename: 'test.build.js',
        path: 'test/',
        publicPath: 'http://' + hostname + ':' + port + '/test'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loaders: ['babel-loader']
            }
        ]
    },
    devServer: {
        host: hostname,
        port: port
    }
};