Add-Type -AssemblyName System.Drawing
foreach($size in @(180,192,512)) {
 $bitmap=New-Object System.Drawing.Bitmap($size,$size)
 $g=[System.Drawing.Graphics]::FromImage($bitmap)
 $g.SmoothingMode='None';$g.PixelOffsetMode='Half'
 $rect=New-Object System.Drawing.Rectangle(0,0,$size,$size)
 $bg=New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect,[System.Drawing.ColorTranslator]::FromHtml('#264B4B'),[System.Drawing.ColorTranslator]::FromHtml('#0B191D'),90)
 $g.FillRectangle($bg,$rect)
 $g.ScaleTransform(($size/80),($size/80));$g.TranslateTransform(8,8)
 function Fill-Pixels($color,$blocks){
  $brush=New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml($color))
  foreach($block in $blocks){$g.FillRectangle($brush,[single]$block[0],[single]$block[1],[single]$block[2],[single]$block[3])}
  $brush.Dispose()
 }
 Fill-Pixels '#BD8C48' @(@(20,4,24,56),@(12,8,40,48),@(8,16,48,32))
 Fill-Pixels '#F5D68C' @(@(20,4,24,48),@(16,8,36,36),@(12,16,44,28),@(20,44,28,8))
 Fill-Pixels '#FFF0C1' @(@(20,8,24,4),@(20,12,4,4),@(16,16,4,28))
 Fill-Pixels '#BD8C48' @(,@(28,20,8,24))
 Fill-Pixels '#FFF0C1' @(,@(28,20,4,20))
 $name=if($size -eq 180){'apple-touch-icon-arcade.png'}else{"icon-$size.png"}
 $bitmap.Save((Join-Path $PSScriptRoot "../public/$name"),[System.Drawing.Imaging.ImageFormat]::Png)
 $bg.Dispose();$g.Dispose();$bitmap.Dispose()
}
