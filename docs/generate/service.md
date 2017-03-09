# akg generate service [name]

> Ajout d'un nouveau service au module parent le plus proche

## Questions

Le générateur de service va vous demandez si celui-ci doit être utilisé pour appeler une resource ou non:

* **Non**: Génère un service vide ;
* **Oui**: Vous demande le nom de la resource et génère un service RESTFull avec les méthodes `getAll`, `get`, `post`, `put` et `remove`.

## Structure

La structure générée est la suivante:

<pre>
├── my-new-service.service.ts
├── my-new-service.service.spec.ts
└── parent.module.ts    <-- Déclare le service dans le module parent
</pre>
