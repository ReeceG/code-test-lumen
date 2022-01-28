<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Carney Test App</title>
    <script type="module" src="{{ URL::asset('js/app.js') }}"></script>
    <style media="screen">
      body {
        margin: 0px;
      }
      table {
        border-spacing: 0px;
      }
      thead, tfoot {
        background-color: #d5d5d5;
      }
      td {
        padding: 4px 16px;
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
