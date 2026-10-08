Add-Type -AssemblyName System.Drawing

$bitmap = New-Object System.Drawing.Bitmap("D:\ASQ Office\arya-geo-infra\public\assets\images\logo.png")
$colorCount = @{}

for ($x = 0; $x -lt $bitmap.Width; $x += 1) {
    for ($y = 0; $y -lt $bitmap.Height; $y += 1) {
        $pixel = $bitmap.GetPixel($x, $y)
        if ($pixel.A -gt 150) {
            # Filter out near whites and grays
            $maxDiff = [Math]::Max([Math]::Abs($pixel.R - $pixel.G), [Math]::Max([Math]::Abs($pixel.R - $pixel.B), [Math]::Abs($pixel.G - $pixel.B)))
            if ($maxDiff -gt 25 -and $pixel.B -gt $pixel.R) {
                $hex = "#{0:X2}{1:X2}{2:X2}" -f $pixel.R, $pixel.G, $pixel.B
                if ($colorCount.ContainsKey($hex)) {
                    $colorCount[$hex]++
                } else {
                    $colorCount[$hex] = 1
                }
            }
        }
    }
}

Write-Host "Non-neutral Blue Colors in Logo:"
$colorCount.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 30 | ForEach-Object {
    $r = [Convert]::ToInt32($_.Key.Substring(1,2), 16)
    $g = [Convert]::ToInt32($_.Key.Substring(3,2), 16)
    $b = [Convert]::ToInt32($_.Key.Substring(5,2), 16)
    Write-Host "$($_.Key) (R:$r, G:$g, B:$b) : $($_.Value) pixels"
}

$bitmap.Dispose()
