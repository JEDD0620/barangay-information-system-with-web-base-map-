<!DOCTYPE html>
<html lang="en">



<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,  user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <link rel="icon" href="/logo.svg">

    <title>Dashboard - San Fancisco BIS</title>
</head>

<body>
    <div id="dashboard"></div>

    <script src="{{asset('js/app.js')}}"></script>
</body>

</html>