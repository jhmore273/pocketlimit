Add-Type -AssemblyName System.Drawing
foreach($size in @(180,192,512)) {
 $bitmap=New-Object System.Drawing.Bitmap($size,$size)
 $g=[System.Drawing.Graphics]::FromImage($bitmap)
 $g.SmoothingMode='AntiAlias'
 $rect=New-Object System.Drawing.Rectangle(0,0,$size,$size)
 $bg=New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect,[System.Drawing.ColorTranslator]::FromHtml('#26382F'),[System.Drawing.ColorTranslator]::FromHtml('#101A16'),90)
 $g.FillRectangle($bg,$rect)
 $g.ScaleTransform(($size/80),($size/80));$g.TranslateTransform(8,8)
 $pen=New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#B9E4CD'),4)
 $pen.StartCap='Round';$pen.EndCap='Round';$pen.LineJoin='Round'
 $p=New-Object System.Drawing.Drawing2D.GraphicsPath
 $p.AddLine(12,27,52,27);$p.AddLine(52,27,52,42)
 $p.AddBezier(52,42,52,55,42,59,32,59);$p.AddBezier(32,59,22,59,12,55,12,42);$p.CloseFigure()
 $g.DrawPath($pen,$p)
 $g.DrawLines($pen,[System.Drawing.PointF[]]@((New-Object System.Drawing.PointF(12,28)),(New-Object System.Drawing.PointF(32,41)),(New-Object System.Drawing.PointF(52,28))))
 $g.DrawLine($pen,32,25,32,11)
 $leaf=New-Object System.Drawing.Drawing2D.GraphicsPath
 $leaf.AddBezier(32,18,20,18,16,13,16,6);$leaf.AddBezier(16,6,27,6,32,11,32,18)
 $leaf.StartFigure();$leaf.AddBezier(32,23,44,23,48,18,48,11);$leaf.AddBezier(48,11,37,11,32,16,32,23)
 $g.DrawPath($pen,$leaf)
 $name=if($size -eq 180){'apple-touch-icon-pocket.png'}else{"icon-$size.png"}
 $bitmap.Save((Join-Path $PSScriptRoot "../public/$name"),[System.Drawing.Imaging.ImageFormat]::Png)
 $leaf.Dispose();$p.Dispose();$pen.Dispose();$bg.Dispose();$g.Dispose();$bitmap.Dispose()
}
