$dest = Join-Path (Get-Location) 'public/images/products'
if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
}

$brain = 'C:\Users\Toto.ADMINISTRATOR\.gemini\antigravity-ide\brain\0b5df481-ff3d-4023-b9ad-67e68282fa08'

$map = @{
    'brique_15_1792178643048.jpg' = 'brique-15.jpg'
    'terrain_acd_1792178662778.jpg' = 'terrain-acd.jpg'
    'villa_duplex_1792178673086.jpg' = 'villa-duplex.jpg'
    'perforateur_1792178703054.jpg' = 'perforateur.jpg'
    'peinture_facade_1792178713124.jpg' = 'peinture-facade.jpg'
    'fer_beton_1792178733940.jpg' = 'fer-beton.jpg'
    'brique_pleine_1792178743929.jpg' = 'brique-pleine.jpg'
    'brique_chainage_1792178775238.jpg' = 'brique-chainage.jpg'
}

foreach ($srcName in $map.Keys) {
    $srcPath = Join-Path $brain $srcName
    $destPath = Join-Path $dest $map[$srcName]
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $destPath -Force
        Write-Output "Copied $srcName -> $($map[$srcName])"
    } else {
        Write-Output "Source not found: $srcPath"
    }
}
