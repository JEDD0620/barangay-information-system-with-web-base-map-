<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>


<body style="margin: 0rem;">

    <table style="width: 100%;">
        <tr>
            <td style="width: 110px;"><img src="<?php echo $_SERVER["DOCUMENT_ROOT"] . '/images/seal/tarlac.png'; ?>" style="height: 110px; width: 110px" /></td>
            <td>
                <div style="text-align: center;">
                    <span>
                        Republic of the Philippines <br>
                        Province of Tarlac <br>
                        City of Tarlac <br>
                    </span>
                    <h2>BARANGAY SAN FRANCICO</h2>
                </div>
            </td>
            <td style="width: 110px;"><img src="<?php echo $_SERVER["DOCUMENT_ROOT"] . '/images/seal/tarlac.png'; ?>" style="height: 110px; width: 110px" /></td>
        </tr>
    </table>

    <div style="text-align: center;">
        <h1>OFFICE OF THE BARANGAY CHAIRMAN</h1>
    </div>

    <table style="padding-bottom:20px">
        <tr>
            <td style="border:1px solid black; width:30%; text-align:center; padding-bottom:20px">

                <h3>Barangay Council</h3>
                <h4 style="margin-bottom: 0;">Barangay chairman</h4>
                <small>Barangay chairman</small>

                <h3>Barangay Kagawad</h3>
                <h4 style="margin-bottom: 0;">Barangay kagawad</h4>
                <small>Barangay kagawad</small>

                <h4 style="margin-bottom: 0;">Barangay kagawad</h4>
                <small>Barangay kagawad</small>

                <h4 style="margin-bottom: 0;">Barangay kagawad</h4>
                <small>Barangay kagawad</small>

                <h4 style="margin-bottom: 0;">Barangay kagawad</h4>
                <small>Barangay kagawad</small>

                <h4 style="margin-bottom: 0;">Barangay kagawad</h4>
                <small>Barangay kagawad</small>

                <h4 style="margin-bottom: 0;">Barangay kagawad</h4>
                <small>Barangay kagawad</small>

                <h4 style="margin-bottom: 0;">Barangay kagawad</h4>
                <small>Barangay kagawad</small>

                <h4 style="margin-bottom: 0;">Barangay kagawad</h4>
                <small>Barangay kagawad</small>

                <h4 style="margin-bottom: 0;">Barangay kagawad</h4>
                <small>Barangay kagawad</small>

                <h4 style="margin-bottom: 0;">Barangay kagawad</h4>
                <small>Barangay kagawad</small>
            </td>

            <td style="width:70%; padding:30px; position:relative">
                <div style="text-align: center;">
                    <h2>BARANGAY CLEARANCE</h2>
                </div>

                <b>TO WHOM IT MAY CONCERN:</b>

                <p>
                    This is to certify that Mr./Ms. <u><b> {{$data->f_name}} </b></u> of legal age is a bonafide resident of Barangay San Francisco, Tarlac City.
                    A law-abiding citizen, he/she is known in the community to be of good moral character and conduct with no derogatory records filed against him/her in this office.
                </p>

                <p>This certification is issued on the request of herein grantee for whatever legal purpose it may serve.</p>

                <p>Given this <u><b> {{now()->format('jS')}} </b></u> day of <u><b> {{now()->format('F')}} </b></u> <u><b> {{now()->format('Y')}} </b></u> at Barangay San Francisco, Tarlac City.</p>
                <p>Purpose: <u><b> Purpose </b></u> </p>

                <div style="padding-top:50px;">
                    <div style="text-align:center; width:fit-content;">
                        <span>Attested:</span>
                        <br>
                        <u><b> Secretary Name </b></u>
                        <p style="margin-top: 0;">Barangay Secretary</p>
                    </div>
                    <br>
                    <div style="text-align:center; width:fit-content;">
                        <span>Attested:</span>
                        <br>
                        <u><b> Chairman Name </b></u>
                        <p style="margin-top: 0;">Barangay Chairman</p>
                    </div>
                    <br>
                    <div style="text-align:center; width:fit-content;">
                        <p>Ctrl No.: <u><b>123456789</b></u> </p>
                    </div>
                </div>

            </td>
        </tr>
    </table>

    <div style="text-align: center;">
        <h4 style="margin-bottom:0"><i><b>Note:</b> This Barangay Clearance is valid for 6 months from the date of issue.</i></h4>
    </div>
</body>

</html>