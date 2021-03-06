import * as React from 'react';
import * as models from '../../../shared/models';
import { ComparisonStatusIcon, HealthStatusIcon } from '../utils';

export const ApplicationSummary = ({app}: {app: models.Application}) => {
    const attributes = [
        {title: 'PROJECT', value: app.spec.project},
        {title: 'CLUSTER', value: app.spec.destination.server},
        {title: 'NAMESPACE', value: app.spec.destination.namespace},
        {title: 'REPO URL', value: (
            <a href={app.spec.source.repoURL} target='_blank' onClick={(event) => event.stopPropagation()}>
                <i className='fa fa-external-link'/> {app.spec.source.repoURL}
            </a> )},
        {title: 'REVISION', value: app.spec.source.targetRevision || 'HEAD'},
        {title: 'PATH', value: app.spec.source.path},
        {title: 'ENVIRONMENT', value: app.spec.source.environment},
        {title: 'STATUS', value: (
            <span><ComparisonStatusIcon status={app.status.comparisonResult.status}/> {app.status.comparisonResult.status}</span>
        )},
        {title: 'HEALTH', value: (
            <span><HealthStatusIcon state={app.status.health}/> {app.status.health.status}</span>
        )},
    ];
    return (
        <div className='white-box'>
            <div className='white-box__details'>
                <p>{app.metadata.name.toLocaleUpperCase()}</p>
                {attributes.map((attr) => (
                    <div className='row white-box__details-row' key={attr.title}>
                        <div className='columns small-3'>
                            {attr.title}
                        </div>
                        <div className='columns small-9'>{attr.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
