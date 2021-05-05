const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map', //em devtools, os source-maps permitem uma organização melhor do arquivo bundle.js gerando uma
  //vizualização mais clara dos scripts na aba source do devtools do navegador
  entry: path.resolve(__dirname, 'src', 'index.tsx'), //arquivo principal da aplicação
  //(é importante usar o path.resolve pois a barra muda em diferentes sistemas operacionais)
  output: {//definição do arquivo gerado com o webpack
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {//define as extensões de arquivos que  webpack será capaz de ler
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  module: {//onde ficarão as as regras de como a aplicação vai se comportar quando estiver importando
    //cada uma das extensões de arquivos
    rules: [//Array de regras com 1 objeto para cada tipo de arquivo
      {
        test: /\.(j|t)sx$/,//expressão regular para determinar se o arquivo é javascript ou não
        exclude: /node_modules/,//exclui a necessidade de aplicar o webpack nos arquivos da pasta node_modules
        //pois os arquivos desta pasta ja estão preparados para serem lidos pelo browser
        use: {
          loader: 'babel-loader', //integração entre o babel e o webpack para que o webpack utilize o babel para converter
          //o arquivo jsx em uma versão que o browser entenda
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],//integração entre o css e o webpack para que o webpack possa entender arquivos css
        //importados nos códigos
      }

    ]
  }
}