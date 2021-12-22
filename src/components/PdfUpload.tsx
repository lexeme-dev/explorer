import React, { Component } from 'react';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
import Spinner from 'react-bootstrap/Spinner';
import { OnCasesBookmarked } from './App';
import PdfService from '../services/PdfService';

type PdfUploadProps = {
    onCasesExtracted: OnCasesBookmarked;
}
type PdfUploadState = {
    invalidFileType: boolean;
    uploadingFile: boolean;
}

class PdfUpload extends Component<PdfUploadProps, PdfUploadState> {
    pdfService: PdfService;

    constructor(props: PdfUploadProps) {
        super(props);
        this.pdfService = new PdfService();
        this.state = {
            invalidFileType: false,
            uploadingFile: false,
        };
    }

    onDrop: DropzoneOptions['onDrop'] = (files): void => {
        const file = files[0];
        if (file.type !== 'application/pdf') {
            this.setState({ invalidFileType: true });
        }
        this.setState({ uploadingFile: true });
        this.pdfService.uploadPdf(file)
            .then((opinionsResponse) => {
                const { onCasesExtracted } = this.props;
                onCasesExtracted(opinionsResponse);
                this.setState({
                    uploadingFile: false,
                    invalidFileType: false,
                });
            });
    };

    renderStatus = (): React.ReactNode => {
        const {
            invalidFileType,
            uploadingFile,
        } = this.state;
        if (uploadingFile) {
            return (
                <div>
                    <Spinner animation="border" role="status" size="sm" />
                    {' Extracting citations...'}
                </div>
            );
        }
        if (invalidFileType) {
            return (<div>File must be a PDF.</div>);
        }
        return '';
    };

    render() {
        return (
            <div>
                <Dropzone onDrop={this.onDrop} maxFiles={1}>
                    {({
                        getRootProps,
                        getInputProps,
                    }) => (
                        <section className="container">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Drag n&apos; drop a PDF here to add its case citations to your selected cases!</p>
                            </div>
                            {this.renderStatus()}
                        </section>
                    )}
                </Dropzone>
            </div>
        );
    }
}

export default PdfUpload;
