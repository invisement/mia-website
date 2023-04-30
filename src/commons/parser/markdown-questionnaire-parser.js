// For all md_files (below), parse markdown questionaire from source and write the result.html in target and metaData.json in metadata

import { marked } from 'marked';
import {readFileSync, writeFileSync} from "fs"

marked.setOptions({
	breaks: true,
})


const md_files = [
    { 
        source: "static/markdowns/insurance-questionnaire.md",
        target: "static/questionnaires/insurance-questionnaire.html",
        metaData: "static/meta-data/insurance-questionnaire.json",
    },
]

for (const {source, target, metaData} of md_files) {
    const [parsed, meta] = parse(source)
    writeFileSync(target, parsed)
    writeFileSync(metaData, JSON.stringify(meta))
}


const removeTags = line => line.replace(/<[^>]*>/g, '').trim()

function parse (source) {
    //var md = await fetch(source).then(r => r.text())
    const md = readFileSync(source, 'utf8')

    const rawHtml = marked.parse(md)
    const metaData = {}

    // tracing variables
    var level = 0
    var question = 0
    var name = "q"
    var answer = 1


    const parsed = rawHtml.split('\n').map(line => {
        if (line == '<ol>' || line == '<ul>') {
            level++
        } else if (line == '</ol>' || line == '</ul>') {
            level--
        } else if ((level == 1 && line.startsWith('<li>')) || (level == 0 && line.startsWith('<p>'))) {
            question++
            name = 'q' + question
            answer = 0
            metaData[name] = {question: removeTags(line), answers: []}
        } else if (line.startsWith('<li>')) {
            answer++
            metaData[name]['answers'].push(removeTags(line))

            if (!line.startsWith('<li><input') && level <= 2) {
                line = line.replace('<li>', '<li><input type="radio">')
            }
            // TODO: add dropbox either by ol or level>2
        }

        line = line
            .replace('<input', `<input name=${name}`)
            .replace('type="checkbox"', `type="checkbox" value=${answer} required`)
            .replace('type="radio"', `type="radio" value=${answer}`)
            .replace('disabled=""', '')

        if (level == 2) {
            line = line
                .replace('<li>', '<li><label>')
                .replace('</li>', '</label></li>')
        }

        return line

    }).join('\n')

    return [parsed, metaData]
}
