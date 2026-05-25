out = '/Users/wangya/Documents/New project/app-summary.pdf'
lines = [
  [:title, 'App Summary'],
  [:meta, 'Source basis: repository contents at /Users/wangya/Documents/New project'],
  [:meta, 'Repo evidence status: No files found in workspace root; summary limited to that evidence.'],
  [:h, 'What It Is'],
  [:b, 'Not found in repo.'],
  [:h, "Who It's For"],
  [:b, 'Not found in repo.'],
  [:h, 'What It Does'],
  [:b, 'Not found in repo.'],
  [:b, 'No source files, docs, manifests, or configuration files present.'],
  [:b, 'No UI, API, or service definitions found.'],
  [:b, 'No routes, screens, or commands found.'],
  [:b, 'No integrations or external dependencies found.'],
  [:b, 'No tests or examples found.'],
  [:h, 'How It Works'],
  [:p, 'Compact architecture overview: Not found in repo. No components, services, data models, or data flow can be evidenced because the workspace is empty.'],
  [:h, 'How to Run'],
  [:b, 'Not found in repo.'],
  [:b, 'Minimal getting started steps cannot be derived from repository evidence.'],
  [:h, 'Evidence Checked'],
  [:b, 'Workspace scan returned only the current directory entry (`.`).'],
  [:b, 'No README, package manifest, source tree, Dockerfile, or lockfile found.']
]

def esc(s)
  s.gsub('\\', '\\\\').gsub('(', '\\(').gsub(')', '\\)')
end

content = []
content << 'BT'
content << '/F1 11 Tf'
y = 800
left = 54
lines.each do |kind, text|
  case kind
  when :title
    content << "1 0 0 1 #{left} #{y} Tm"
    content << '/F1 20 Tf'
    content << "(#{esc(text)}) Tj"
    y -= 24
    content << '/F1 9 Tf'
  when :meta
    content << "1 0 0 1 #{left} #{y} Tm"
    content << '/F1 9 Tf'
    content << "(#{esc(text)}) Tj"
    y -= 14
  when :h
    y -= 8
    content << "1 0 0 1 #{left} #{y} Tm"
    content << '/F1 12 Tf'
    content << "(#{esc(text)}) Tj"
    y -= 16
  when :b
    content << "1 0 0 1 #{left + 10} #{y} Tm"
    content << '/F1 10 Tf'
    content << "(- #{esc(text)}) Tj"
    y -= 14
  when :p
    words = text.split(/\s+/)
    current = ''
    wrapped = []
    words.each do |w|
      test = [current, w].reject(&:empty?).join(' ')
      if test.length > 95
        wrapped << current
        current = w
      else
        current = test
      end
    end
    wrapped << current unless current.empty?
    wrapped.each do |line|
      content << "1 0 0 1 #{left + 10} #{y} Tm"
      content << '/F1 10 Tf'
      content << "(#{esc(line)}) Tj"
      y -= 13
    end
  end
end
content << 'ET'
stream = content.join("\n")
objects = []
objects << '<< /Type /Catalog /Pages 2 0 R >>'
objects << '<< /Type /Pages /Count 1 /Kids [3 0 R] >>'
objects << '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>'
objects << '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
objects << "<< /Length #{stream.bytesize} >>\nstream\n#{stream}\nendstream"

pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n".b
offsets = [0]
objects.each_with_index do |obj, idx|
  offsets << pdf.bytesize
  pdf << "#{idx + 1} 0 obj\n#{obj}\nendobj\n"
end
xref_start = pdf.bytesize
pdf << "xref\n0 #{objects.length + 1}\n"
pdf << "0000000000 65535 f \n"
offsets[1..].each do |off|
  pdf << format("%010d 00000 n \n", off)
end
pdf << "trailer\n<< /Size #{objects.length + 1} /Root 1 0 R >>\nstartxref\n#{xref_start}\n%%EOF\n"
File.binwrite(out, pdf)
puts out
puts File.size(out)
