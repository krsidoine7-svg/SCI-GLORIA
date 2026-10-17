$brain = 'C:\Users\Toto.ADMINISTRATOR\.gemini\antigravity-ide\brain\0b5df481-ff3d-4023-b9ad-67e68282fa08'
$dest = 'public\images\products'
if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
}

Copy-Item (Join-Path $brain 'carrelage_gres_1792179323297.jpg') (Join-Path $dest 'carrelage-gres-1.jpg') -Force
Copy-Item (Join-Path $brain 'carrelage_zoom_1792179348633.jpg') (Join-Path $dest 'carrelage-gres-2.jpg') -Force
Copy-Item (Join-Path $brain 'wc_suspendu_1792179357519.jpg') (Join-Path $dest 'wc-suspendu-1.jpg') -Force

Get-ChildItem $dest | Select-Object Name, Length
