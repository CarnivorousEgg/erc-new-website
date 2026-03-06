$basePath = "c:\Users\jajoo\OneDrive\Desktop\BITS\ERC\Website\New_version\erc-new-website\public\images\people"

$images = @(
    # 2022 Batch
    @{url="https://erc-bpgc.github.io/img/people/2022_batch/Parth_Shah.jpeg"; name="Parth Shah"; batch="2022 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/2022_batch/Ritwik_Shwarma.jpeg"; name="Ritwik Sharma"; batch="2022 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/2022_batch/Ajinkya_Deshpande.png"; name="Ajinkya Deshpande"; batch="2022 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/2022_batch/Vimarsh_Shah.jpg"; name="Vimarsh Shah"; batch="2022 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/2022_batch/Ansh_Parmeshwar.jpeg"; name="Ansh Parmeshwar"; batch="2022 Batch"},
    
    # 2021 Batch
    @{url="https://erc-bpgc.github.io/img/people/arjun_puthli.jpeg"; name="Arjun Puthli"; batch="2021 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/shantanu_deshmukh.jpeg"; name="Shantanu Deshmukh"; batch="2021 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/aditya_kurande.jpg"; name="Aditya Kurande"; batch="2021 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/aasim_sayyed.jpg"; name="Aasim Sayyed"; batch="2021 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/ishan_gokhale.jpg"; name="Ishan Gokhale"; batch="2021 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Akshat Tubki"; batch="2021 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Adarsh Gopalakrishnan"; batch="2021 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Ninaad Kotasthane"; batch="2021 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Priyanshu Kumar"; batch="2021 Batch"},
    
    # 2020 Batch
    @{url="https://erc-bpgc.github.io/img/people/atharva_ghotavadekar.jpg"; name="Atharva Ghotavadekar"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/dhruv_potdar.png"; name="Dhruv Potdar"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/aditya_parandekar.jpeg"; name="Aditya Parandekar"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/siddh_gosar.jpg"; name="Siddh Gosar"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/laukik_nakhwa.jpg"; name="Laukik Nakhwa"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/ishan_tandon.jpeg"; name="Ishan Tandon"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/yash_chavan.jpeg"; name="Yash Chavan"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/k_sai_akshit.JPG"; name="K Sai Akshit"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/manan_arora.jpg"; name="Manan Arora"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/yash_yelmame.jpg"; name="Yash Yelmame"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/divith_mahajan.jpeg"; name="Divith Mahajan"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/ajay_krishna_gurubaran.jpg"; name="Ajay Krishna Gurubaran"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/sahil_shingote.jpeg"; name="Sahil Shingote"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/rohan_divekar.jpg"; name="Rohan Divekar"; batch="2020 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/tanay_patni.jpg"; name="Tanay Patni"; batch="2020 Batch"},
    
    # 2019 Batch
    @{url="https://erc-bpgc.github.io/img/people/ashutosh_gupta.jpeg"; name="Ashutosh Gupta"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/archit_rungta.jpg"; name="Archit Rungta"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/pranav_goyal.jpg"; name="Pranav Goyal"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/yash_jangir.jpg"; name="Yash Jangir"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/cheriyan_homey.jpg"; name="Cheriyan Homey"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/srujan_deolasee.jpeg"; name="Srujan Deolasee"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/abdul_jawad_khan.jpg"; name="Abdul Jawad Khan"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/avinandan_nag.jpg"; name="Avinandan Nag"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/paurush_punyasheel.png"; name="Paurush Punyasheel"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/sanskar_jain.jpg"; name="Sanskar Jain"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/suhrudh_s.jpeg"; name="Suhrudh S"; batch="2019 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/sushant_sreeram_swamy.jpg"; name="Sushant S"; batch="2019 Batch"},
    
    # 2018 Batch
    @{url="https://erc-bpgc.github.io/img/people/atharv_sonwane.jpg"; name="Atharv Sonwane"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/tanmay_bhonsale.jpg"; name="Tanmay Bhonsale"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/vedant_shah.jpg"; name="Vedant Shah"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/advait_kulkarni.jpg"; name="Advait Kulkarni"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/eash_vrudhula.jpg"; name="Eash Vrudhula"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/mohit_chaudhari.jpeg"; name="Mohit Chaudhari"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/aditya_bidwai.jpg"; name="Aditya Bidwai"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/anirudha_shrinivas.jpg"; name="Anirudha Shrinivas"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/shivangi_gupta.jpg"; name="Shivangi Gupta"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/vishal_singh.jpg"; name="Vishal Singh"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/aadhar_sharma.jpeg"; name="Aadhar Sharma"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/abhishek_dixit.jpg"; name="Abhishek Dixit"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/shambhavi_singh.jpg"; name="Shambhavi Singh"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/rohan_kunjir.jpeg"; name="Rohan Kunjir"; batch="2018 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/shaktivelan_kartikeyan.jpg"; name="Shaktivelan Kartikeyan"; batch="2018 Batch"},
    
    # 2017 Batch
    @{url="https://erc-bpgc.github.io/img/people/tejas_rane.jpeg"; name="Tejas Rane"; batch="2017 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/rishikesh_vanarase.jpg"; name="Rishikesh Vanarse"; batch="2017 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/harshal_deshpande.jpg"; name="Harshal Deshpande"; batch="2017 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/prathmesh_thorwe.jpeg"; name="Prathmesh Thorwe"; batch="2017 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/aditya_phopale.jpeg"; name="Aditya Phopale"; batch="2017 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/mohit_gupta.jpeg"; name="Mohit Gupta"; batch="2017 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/ojit_mehta.jpeg"; name="Ojit Mehta"; batch="2017 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/sanket_yannuwar.jpeg"; name="Sanket Yannuwar"; batch="2017 Batch"},
    
    # 2016 Batch
    @{url="https://erc-bpgc.github.io/img/people/amogh_dabholkar.png"; name="Amogh Dabholkar"; batch="2016 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/mihir_kulkarni.jpg"; name="Mihir Kulkarni"; batch="2016 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/jaideep_ram.jpg"; name="G V S S Jaideep Ram"; batch="2016 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/kapi_mehta.jpeg"; name="Kapi Ketan Mehta"; batch="2016 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/mihir_dharmadhikari.jpg"; name="Mihir Dharmadhikari"; batch="2016 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/yash_pandit.jpeg"; name="Yash Pandit"; batch="2016 Batch"},
    
    # 2015 Batch
    @{url="https://erc-bpgc.github.io/img/people/abhimanyu.jpeg"; name="Abhimanyu"; batch="2015 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/shubham_chavan.jpeg"; name="Shubham Chavan"; batch="2015 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/abhishek_moitra.jpeg"; name="Abhishek Moitra"; batch="2015 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/rohan_godiyal.jpeg"; name="Rohan Godiyal"; batch="2015 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/smit_rajguru.jpeg"; name="Smit Rajguru"; batch="2015 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/nikhil_khedekar.jpg"; name="Nikhil Khedekar"; batch="2015 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/utkarsh_sarawgi.jpeg"; name="Utkarsh Sarawgi"; batch="2015 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/shubham_kumar.jpeg"; name="Shubham Kumar"; batch="2015 Batch"},
    
    # 2014 Batch
    @{url="https://erc-bpgc.github.io/img/people/anand_dugad.jpeg"; name="Anand Dugad"; batch="2014 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/harsh_mavani.jpeg"; name="Harsh Mavani"; batch="2014 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/sanjeev_murthy.png"; name="Sanjeev Murthy"; batch="2014 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/shubhan_patni.jpeg"; name="Shubhan Patni"; batch="2014 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/parva_patel.jpeg"; name="Parva Patel"; batch="2014 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/tejas_zodage.png"; name="Tejas Zodage"; batch="2014 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/akshay_sancheti.jpeg"; name="Akshay Sancheti"; batch="2014 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/ananyo_rao.jpeg"; name="Ananyo Rao"; batch="2014 Batch"},
    
    # 2013 Batch
    @{url="https://erc-bpgc.github.io/img/people/pranav_pal_lekhi.jpeg"; name="Pranav Pal Lekhi"; batch="2013 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/tanvi_jadhav.jpeg"; name="Tanvi Jadhav"; batch="2013 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/shubham_sarwate.jpeg"; name="Shubham Sarwate"; batch="2013 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/apurv_hajare.jpg"; name="Apurv Hajare"; batch="2013 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/aayush_attri.jpg"; name="Aayush Attri"; batch="2013 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/shubham_maheshwari.png"; name="Shubham Maheshwari"; batch="2013 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/vedangi_pathak.png"; name="Vedangi Pathak"; batch="2013 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/mandar_pradhan.png"; name="Mandar Pradhan"; batch="2013 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/edwin_mascarenhas.png"; name="Edwin Mascarenhas"; batch="2013 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/sudeep_mishra.jpeg"; name="Sudeep Mishra"; batch="2013 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/vichar_shroff.jpeg"; name="Vichar Shroff"; batch="2013 Batch"},
    
    # 2012 Batch
    @{url="https://erc-bpgc.github.io/img/people/maitreya_naik.jpeg"; name="Maitreya Naik"; batch="2012 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/rahul_bhola.jpeg"; name="Rahul Bhola"; batch="2012 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/souryendu_das.jpeg"; name="Souryendu Das"; batch="2012 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/sharad_maheshwari.jpeg"; name="Sharad Maheshwari"; batch="2012 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/aum_jadhav.jpg"; name="Aum Jadhav"; batch="2012 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/soham_patkar.png"; name="Soham Patkar"; batch="2012 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Madhura Gandhi"; batch="2012 Batch"},
    
    # 2011 Batch
    @{url="https://erc-bpgc.github.io/img/people/shikhar_sharma.jpeg"; name="Shikhar Sharma"; batch="2011 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/neisarg_dave.jpeg"; name="Neisarg Dave"; batch="2011 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/sneha_bajaj.jpeg"; name="Sneha Bajaj"; batch="2011 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Shridevi Muthkhod"; batch="2011 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/niharika_gupta.jpeg"; name="Niharika Gupta"; batch="2011 Batch"},
    
    # 2010 Batch
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Ronak Gupta"; batch="2010 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Nikhilesh Behera"; batch="2010 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/apurva_ankleshwaria.jpg"; name="Apurva Ankleshwaria"; batch="2010 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Kushagra Nigam"; batch="2010 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/vishal_pathak.png"; name="Vishal Pathak"; batch="2010 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/arihant_lunawat.jpeg"; name="Arihant Lunawat"; batch="2010 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/arnav_goel.jpeg"; name="Arnav Goel"; batch="2010 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Rohit Sant"; batch="2010 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Chintak Sheth"; batch="2010 Batch"},
    
    # 2009 Batch
    @{url="https://erc-bpgc.github.io/img/people/jinal_shah.jpeg"; name="Jinal Shah"; batch="2009 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Akshay Barapatre"; batch="2009 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/saksham_bhatla.png"; name="Saksham Bhatla"; batch="2009 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Kartik Mankad"; batch="2009 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Deepak Chandra"; batch="2009 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Mihir Karkhane"; batch="2009 Batch"},
    
    # 2008 Batch
    @{url="https://erc-bpgc.github.io/img/people/avinash_kumar.png"; name="Avinash Kumar"; batch="2008 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Shatruddha Kushwaha"; batch="2008 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/nitant_gupta.jpg"; name="Nitant Gupta"; batch="2008 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Nishant Singh"; batch="2008 Batch"},
    
    # 2007 Batch
    @{url="https://erc-bpgc.github.io/img/people/ajusal_sugathan.jpeg"; name="Ajusal Sugathan"; batch="2007 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/kinshuk_kar.jpeg"; name="Kinshuk Kar"; batch="2007 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Priti Sahay"; batch="2007 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/placeholder.jpeg"; name="Shraddha Mehta"; batch="2007 Batch"},
    
    # 2006 Batch
    @{url="https://erc-bpgc.github.io/img/people/arjun_bidesi.jpeg"; name="Arjun Bidesi"; batch="2006 Batch"},
    @{url="https://erc-bpgc.github.io/img/people/jayanth_varanasi.jpeg"; name="Jayanth Varanasi"; batch="2006 Batch"}
)

$count = 0
$total = $images.Count

foreach ($img in $images) {
    $count++
    $ext = [System.IO.Path]::GetExtension($img.url)
    $filename = "$($img.name)$ext"
    $folder = Join-Path $basePath $img.batch
    $filepath = Join-Path $folder $filename
    
    Write-Host "[$count/$total] Downloading: $($img.name) -> $($img.batch)" -ForegroundColor Cyan
    
    try {
        Invoke-WebRequest -Uri $img.url -OutFile $filepath -ErrorAction Stop
        Write-Host "  SUCCESS" -ForegroundColor Green
    } catch {
        Write-Host "  FAILED: $_" -ForegroundColor Red
    }
}

Write-Host "`nDownload complete! $count images processed." -ForegroundColor Yellow
