# Download ERC Handbook images

$baseUrl = "https://erc-bpgc.github.io/handbook"
$destDir = "c:\Users\jajoo\OneDrive\Desktop\BITS\ERC\Website\New_version\erc-new-website\public\images\handbook"

# Create subdirectories
$subdirs = @("automation", "electronics", "mechanical", "simulation")
foreach ($dir in $subdirs) {
    New-Item -ItemType Directory -Path "$destDir\$dir" -Force | Out-Null
}

# Define images to download
$images = @(
    # Automation - ROS
    @{ url = "$baseUrl/automation/ROS/Graph.png"; dest = "$destDir\automation\ros-graph.png" }
    
    # Electronics - Arduino
    @{ url = "$baseUrl/electronics/Development_Boards/images/arduino1.png"; dest = "$destDir\electronics\arduino1.png" }
    @{ url = "$baseUrl/electronics/Development_Boards/images/arduino2.png"; dest = "$destDir\electronics\arduino2.png" }
    @{ url = "$baseUrl/electronics/Development_Boards/images/arduinoide.png"; dest = "$destDir\electronics\arduinoide.png" }
    @{ url = "$baseUrl/electronics/Development_Boards/images/arduinopot.png"; dest = "$destDir\electronics\arduinopot.png" }
    
    # Mechanical - Gears
    @{ url = "$baseUrl/mechanical/images/gears1.png"; dest = "$destDir\mechanical\gears1.png" }
    @{ url = "$baseUrl/mechanical/images/gears2.png"; dest = "$destDir\mechanical\gears2.png" }
    @{ url = "$baseUrl/mechanical/images/gears3.png"; dest = "$destDir\mechanical\gears3.png" }
    @{ url = "$baseUrl/mechanical/images/gears4.png"; dest = "$destDir\mechanical\gears4.png" }
    @{ url = "$baseUrl/mechanical/images/gears5.png"; dest = "$destDir\mechanical\gears5.png" }
    @{ url = "$baseUrl/mechanical/images/gears6.png"; dest = "$destDir\mechanical\gears6.png" }
    @{ url = "$baseUrl/mechanical/images/gears7.png"; dest = "$destDir\mechanical\gears7.png" }
    @{ url = "$baseUrl/mechanical/images/gears8.png"; dest = "$destDir\mechanical\gears8.png" }
    @{ url = "$baseUrl/mechanical/images/gears9.png"; dest = "$destDir\mechanical\gears9.png" }
    
    # Mechanical - Drive Mechanism
    @{ url = "$baseUrl/mechanical/images/drive0.png"; dest = "$destDir\mechanical\drive0.png" }
    @{ url = "$baseUrl/mechanical/images/drive1.png"; dest = "$destDir\mechanical\drive1.png" }
    @{ url = "$baseUrl/mechanical/images/drive2.jpg"; dest = "$destDir\mechanical\drive2.jpg" }
    @{ url = "$baseUrl/mechanical/images/drive3.png"; dest = "$destDir\mechanical\drive3.png" }
    @{ url = "$baseUrl/mechanical/images/drive4.png"; dest = "$destDir\mechanical\drive4.png" }
)

Write-Host "Downloading ERC Handbook images..."

foreach ($img in $images) {
    try {
        Write-Host "Downloading: $($img.url)"
        Invoke-WebRequest -Uri $img.url -OutFile $img.dest -UseBasicParsing
        Write-Host "  Saved to: $($img.dest)" -ForegroundColor Green
    } catch {
        Write-Host "  Failed: $_" -ForegroundColor Red
    }
}

Write-Host "`nDownload complete!"
